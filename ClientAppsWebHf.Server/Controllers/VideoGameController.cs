using ClientAppsWebHf.Server.Models;
using ClientAppsWebHf.Server.Models.Dto_s;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClientAppsWebHf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoGameController : ControllerBase
    {
        private readonly DatabaseContext _dbConext;

        public VideoGameController([FromServices]DatabaseContext dbConext) 
        {
            this._dbConext = dbConext;
        }

        [HttpGet("GetVideoGamesListView/")]
        public async Task<ActionResult<VideoGameListViewDto>> GetVideoGamesListView() 
        {
            try 
            {
                List<VideoGame> videoGames = await this._dbConext.VideoGames.ToListAsync();
                List<VideoGameListViewDto> videoGameListViewDtos = new List<VideoGameListViewDto>();
                videoGames.ForEach(v => videoGameListViewDtos.Add(new VideoGameListViewDto(v.Id, v.Title)));
                return Ok(videoGameListViewDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("GetVideGamesCardView/")]
        public async Task<ActionResult<VideoGameCardViewDto>> GetVideoGamesCardView()
        {
            try
            {
                List<VideoGame> videoGames = await this._dbConext.VideoGames.ToListAsync();
                List<VideoGameCardViewDto> videoGameCardViewDtos = new List<VideoGameCardViewDto>();
                videoGames.ForEach(v => videoGameCardViewDtos.Add(new VideoGameCardViewDto(v.Id, v.Title, v.Rating)));
                return Ok(videoGameCardViewDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("GetVideoGameDetailedViewById/")]
        public async Task<ActionResult<VideoGameDto>> GetVideoGameDetailedViewById(string id)
        {
            VideoGame? videoGame = await this._dbConext.FindAsync<VideoGame>(id);
            if (videoGame != null)
            {
                VideoGameDto videoGameDto = new VideoGameDto(videoGame.Id, videoGame.Title, videoGame.ReleaseDate, videoGame.StudioName, videoGame.Rating, videoGame.Image);
                return Ok(videoGameDto);
            }
            return NotFound(new { error = "videogame not found" });
        }

        [HttpPost("AddNewVideoGame/")]
        public async Task<ActionResult<string>> AddNewVideoGame(CreateOrUpdateVideoGameDto videoGameDto) 
        {
            try 
            {
                VideoGame videoGame = new VideoGame
                {
                    Title = videoGameDto.title,
                    ReleaseDate = videoGameDto.date,
                    StudioName = videoGameDto.studioName,
                    Rating = videoGameDto.rating,
                    Image = new byte[] { }
                };
                await this._dbConext.VideoGames.AddAsync(videoGame);   
                await this._dbConext.SaveChangesAsync();
                return Ok(new { id = videoGame.Id });
            } 
            catch (Exception ex) 
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("DeleteVideoGameById/")]
        public async Task<ActionResult> DeleteVideoGameById(string id) 
        {
            VideoGame? videoGame = await this._dbConext.VideoGames.FindAsync(id);
            if(videoGame != null) 
            {
                this._dbConext.VideoGames.Remove(videoGame);
                this._dbConext.SaveChanges();
                return Ok(new { message = "Successful delete" });
            }
            return BadRequest(new { error = "Something went wrong..." });
        }

        [HttpPut("UpdateVideoGame/")]
        public async Task<ActionResult> UpdateVideoGame(string id, CreateOrUpdateVideoGameDto videoGameDto)
        {
            VideoGame? videoGame = await this._dbConext.VideoGames.FindAsync(id);
            if (videoGame != null)
            {
                if (videoGameDto.title != "") { videoGame.Title = videoGameDto.title; }
                if (videoGameDto.date != "") { videoGame.ReleaseDate = videoGameDto.date; }
                if (videoGameDto.rating != 0) { videoGame.Rating = videoGameDto.rating; }
                if (videoGameDto.studioName != "") { videoGame.StudioName = videoGameDto.studioName; }
                this._dbConext.SaveChanges();
                return Ok(new { message = "VideoGame successfully updated" });
            }
            return BadRequest(new { error = "Something went wrong:(" });
        }

        [HttpPost("UploadImageForVideoGame/")]
        public async Task<ActionResult> UploadImageForVideoGame(string id, [FromForm]IFormFile imageFile) 
        {
            VideoGame? videoGame = await this._dbConext.VideoGames.FindAsync(id);
            if (videoGame != null) 
            {
                using (var memoryStream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(memoryStream);
                    byte[] imageBytes = memoryStream.ToArray();
                    videoGame.Image = imageBytes;
                    this._dbConext.SaveChanges();
                }
                return Ok(new { message = "Image Saved" });
            }
            return NotFound(new { message = "Video Game not Found :(" });
        }
    }
}
