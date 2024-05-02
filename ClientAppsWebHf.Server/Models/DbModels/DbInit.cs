using ClientAppsWebHf.Server.Models;
using SixLabors.ImageSharp;

namespace ClientAppsWebHf.Server.Models
{
    public class DbInit
    {
        public static void Init(DatabaseContext databaseContext) 
        {
            //A paraméterként megadott filenév szerint byte tömbbé konvertálja a képet
            byte[] ImageToByteArray(string fileName) 
            {
                string workingDirectoy = Environment.CurrentDirectory;
                string fullPath = Path.Combine(workingDirectoy + "/Assets/" + fileName + ".jpg");
                Image img = Image.Load(fullPath);
                using (var ms  = new MemoryStream()) 
                {
                    img.SaveAsJpeg(ms);
                    return ms.ToArray();
                }
            }

            var existingVideoGames = databaseContext.VideoGames.ToList();
            databaseContext.RemoveRange(existingVideoGames);
            databaseContext.SaveChanges();

            List<VideoGame> videoGames = new List<VideoGame>()
            {
                new VideoGame("Elden Ring", DateTime.Now.ToString("MM-dd-yyyy"), "Fromsoftware", 10, ImageToByteArray("eldenring")),
                new VideoGame("Leauge Of Legends", DateTime.Now.ToString("MM-dd-yyyy"), "Riot Games", 3, ImageToByteArray("lol")),
                new VideoGame("Sekiro", DateTime.Now.ToString("MM-dd-yyyy"), "Fromsoftware", 10, ImageToByteArray("sekiro")),
                new VideoGame("Dota2", DateTime.Now.ToString("MM-dd-yyyy"), "Valve Corporation", 5, ImageToByteArray("dota2")),
                new VideoGame("Crash Bandicoot", DateTime.Now.ToString("MM-dd-yyyy"), "Sony Interactive Entertainment", 8, ImageToByteArray("crashbandicoot")),
                new VideoGame("Rain World", DateTime.Now.ToString("MM-dd-yyyy"), "VideoCult", 10, ImageToByteArray("rainworld")),
                new VideoGame("Dark Souls 3.", DateTime.Now.ToString("MM-dd-yyyy"), "Fromsoftware", 9, ImageToByteArray("ds3"))
            };
            foreach (var videoGame in videoGames) 
            {
                databaseContext.VideoGames.Add(videoGame);
            }
            databaseContext.SaveChanges();
        }
    }
}
