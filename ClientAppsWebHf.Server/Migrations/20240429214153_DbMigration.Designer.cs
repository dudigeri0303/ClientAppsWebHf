﻿// <auto-generated />
using System;
using ClientAppsWebHf.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ClientAppsWebHf.Server.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240429214153_DbMigration")]
    partial class DbMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ClientAppsWebHf.Server.Models.VideoGame", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("ReleaseDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StudioName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("VideoGames", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
