namespace ClientAppsWebHf.Server.Models.Dto_s;

public record VideoGameDto(string? id, string? title, string? releaseDate, string? studioName, int? rating, byte[]? image);

//hiányzik a datetime és az image byte tömb
public record CreateOrUpdateVideoGameDto(string? title, string? studioName, int? rating, string? date);
public record VideoGameCardViewDto(string? id, string? title, int? rating);
public record VideoGameListViewDto(string? id, string? title);

