using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;
using ReactBookmarks.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("AddBookmark")]       
        public void AddBookmark(Bookmark b)
        {
            var repo = new BookmarksRepository(_connectionString);
            b.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.AddBookmark(b);
        }
        [HttpGet]
        [Route("GetUserBookmarks")]        
        public List<Bookmark> GetUserBookmarks()
        {
            var repo = new BookmarksRepository(_connectionString);
            int userId = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetUserBookmarks(userId);
        }
        [HttpPost]
        [Route("DeleteBookmark")]       
        public void DeleteBookmark(DeleteBookmarkViewModel vm)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.DeleteBookmark(vm.BookmarkId);
        }
        [HttpPost]
        [Route("UpdateBookmark")]       
        public void UpdateBookmark(Bookmark b)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.UpdateBookmark(b);
        }
        [HttpGet]
        [Route("Top5Urls")]
        [AllowAnonymous]
        public List<PopularUrls> GetTop5Urls()
        {
            var repo = new BookmarksRepository(_connectionString);
            return repo.GetTop5Urls();
        }
    }
}
