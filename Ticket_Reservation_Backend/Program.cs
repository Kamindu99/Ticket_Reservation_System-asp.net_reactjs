/*
   File Name: Program.cs
   Author: S.A.V.J. Senadeera - IT20219420
   Description: This file contains the configuration and setup code for the TicketReservation API.
    It configures the services, dependencies, and endpoints, including CORS, MongoDB settings, and Swagger documentation.

*/

using TicketReservation.Models;
using TicketReservation.Services;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigin", builder =>
  {
      builder
          .WithOrigins("http://localhost:3000") // Replace with the allowed origin(s)
          .AllowAnyMethod()
          .AllowAnyHeader();
  });
});



builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("TrainDB"));
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<TrainService>();
builder.Services.AddSingleton<AdminUserService>();
builder.Services.AddSingleton<BookingService>();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
