using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarks.Data
{
    public class BookmarksRepository
    {
        private readonly string _connectionString;
        public BookmarksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(Bookmark b)
        {
            using var context = new BookmarksDbContext(_connectionString);
            if(!context.Bookmarks.Where(bm => bm.UserId == b.UserId).Any(bm => bm.Url == b.Url))
            {
                context.Bookmarks.Add(b);
                context.SaveChanges();
            }                       
        }
        public List<Bookmark> GetUserBookmarks(int id)
        {
            using var context = new BookmarksDbContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public void DeleteBookmark(int id)
        {
            using var context = new BookmarksDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE id={id}");
            context.SaveChanges();
        }
        public void UpdateBookmark(Bookmark b)
        {
            using var context = new BookmarksDbContext(_connectionString);
            context.Bookmarks.Attach(b);
            context.Entry(b).State = EntityState.Modified;
            context.SaveChanges();
        }
        public List<PopularUrls> GetTop5Urls()
        {
            using var context = new BookmarksDbContext(_connectionString);
           return context.Bookmarks.GroupBy(b => b.Url)
                .OrderByDescending(g => g.Count()).Take(5)
                .Select(g => new PopularUrls { Url = g.Key, Count = g.Count() }).ToList();                       
        }
        public void AddUser(User user, string password)
        {
            string hash = BCrypt.Net.BCrypt.HashPassword(password);
            using var ctx = new BookmarksDbContext(_connectionString);
            user.PasswordHash = hash;
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isValidPassword)
            {
                return user; 
            }
            return null;
        }
        public User GetByEmail(string email)
        {
            using var ctx = new BookmarksDbContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }
    }
}
