/*
   File Name: BookingService.cs
   Author: W.W.L.K.G. Wanigasinghe - IT20218744
   Description: This file contains the implementation of the BookingService class
   , which serves as the service component responsible for booking-related operations
    in the TicketReservation API. It acts as an intermediary between the 
    BookingController and the MongoDB database, facilitating functions 
    for creating, retrieving, updating, and deleting booking details.
*/

using TicketReservation.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TicketReservation.Services
{
    public class BookingService
    {
        private readonly IMongoCollection<BookingDetails> _bookingDetails;

        public BookingService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase("TrainGoDB");
            _bookingDetails = database.GetCollection<BookingDetails>("Bookings");
        }

        // Create a new reservation in the TrainGoDB
        public async Task CreateAsync(BookingDetails bookingDetails)
        {
            await _bookingDetails.InsertOneAsync(bookingDetails);
            Console.WriteLine("Booking Added Successfully");
        }

        // Retrieve the list of all created reservations
        public async Task<List<BookingDetails>> GetBookingsAsync()
        {
            Console.WriteLine("Getting all Bookings");
            return await _bookingDetails.Find(new BsonDocument()).ToListAsync();
        }

        // Retrieve a specific reservation by ID
        public async Task<BookingDetails> GetBookingDetailsByIdAsync(string id)
        {
            Console.WriteLine($"Getting Booking by ID: {id}");
            var filter = Builders<BookingDetails>.Filter.Eq("Id", id);
            return await _bookingDetails.Find(filter).FirstOrDefaultAsync();
        }

        // Retrieve a specific reservation by customer ID
        public async Task<List<BookingDetails>> GetBookingDetailsByUserIdAsync(string CusId)
        {
            Console.WriteLine($"Getting Booking by User ID: {CusId}");

            var filter = Builders<BookingDetails>.Filter.Eq("CusId", CusId);
            return await _bookingDetails.Find(filter).ToListAsync();
        }

        // Update a specific reservation details using reservation ID
        public async Task UpdateBookingAsync(string id, BookingDetails bookingDetails)
        {
            Console.WriteLine($"Updating Booking Details with ID: {id}");
            FilterDefinition<BookingDetails> filter = Builders<BookingDetails>.Filter.Eq("Id", id);
            UpdateDefinition<BookingDetails> update = Builders<BookingDetails>.Update
                .Set("CusName", bookingDetails.CusName)
                .Set("CusNIC", bookingDetails.CusNIC)
                .Set("CusId", bookingDetails.CusId)
                .Set("Bookdate", bookingDetails.Bookdate)
                .Set("From", bookingDetails.From)
                .Set("To", bookingDetails.To)
                .Set("Traintime", bookingDetails.Traintime)
                .Set("NoOfTickets", bookingDetails.NoOfTickets)
                .Set("TrainClass", bookingDetails.TrainClass)
                .Set("Total", bookingDetails.Total)
                .Set("TrainId", bookingDetails.TrainId)
                .Set("TrainName", bookingDetails.TrainName)
                .Set("BookedDate", bookingDetails.BookedDate)
                .Set("Status", bookingDetails.Status);
            await _bookingDetails.UpdateOneAsync(filter, update);
        }


        // Delete a specific reservation by ID
        public async Task DeleteAsync(string id)
        {
            Console.WriteLine($"Deleting Booking with ID: {id}");
            FilterDefinition<BookingDetails> filter = Builders<BookingDetails>.Filter.Eq("Id", id);
            await _bookingDetails.DeleteOneAsync(filter);
        }
    }
}
