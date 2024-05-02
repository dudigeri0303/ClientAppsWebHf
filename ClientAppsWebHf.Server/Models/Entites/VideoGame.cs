using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClientAppsWebHf.Server.Models
{
    public class VideoGame
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Id { get; set; }
        [Column]
        public string? Title { get; set; }
        [Column]
        public string? ReleaseDate { get; set; }
        [Column]
        public string? StudioName { get; set; }
        [Column]
        public int? Rating { get; set; }
        [Column]
        public byte[] Image { get; set; }

        public VideoGame() { }
        public VideoGame(string title, string releaseDate, string studioName, int rating, byte[] image) 
        {
            Title = title;
            ReleaseDate = releaseDate;
            StudioName = studioName;
            Rating = rating;
            Image = image;
        }
    }
}
