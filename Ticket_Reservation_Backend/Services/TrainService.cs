/*
   File Name: TrainService.cs
   Author: G.A.H.A. Nethmini - IT20106874
   Description: This file contains the implementation of the TrainService class, 
        which serves as the service component responsible for train-related operations in the 
        TicketReservation API. It acts as an intermediary between the 
        TrainController and the MongoDB database, facilitating functions 
        for creating, retrieving, updating, and deleting train data.
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
    public class TrainService
    {
        private readonly IMongoCollection<Train> _trains;

        public TrainService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase("TrainGoDB");
            _trains = database.GetCollection<Train>("Train");
        }


// Create a new train in the TrainGoDB
        public async Task CreateAsync(Train train)
        {
            await _trains.InsertOneAsync(train);
            Console.WriteLine("Train created");
        }

// Retrieve the list of all created trains
        public async Task<List<Train>> GetTrainsAsync()
        {
            Console.WriteLine("Getting all trains");
            return await _trains.Find(new BsonDocument()).ToListAsync();
        }

// Retrieve a specific train by ID
        public async Task<Train> GetTrainByIdAsync(string id)
        {
            Console.WriteLine($"Getting train by ID: {id}");
            var filter = Builders<Train>.Filter.Eq("Id", id);
            return await _trains.Find(filter).FirstOrDefaultAsync();
        }


// Update a specific train details using train ID
        public async Task UpdateTrainAsync(string id, Train train)
        {
            Console.WriteLine($"Updating train with ID: {id}");
            FilterDefinition<Train> filter = Builders<Train>.Filter.Eq("Id", id);
            UpdateDefinition<Train> update = Builders<Train>.Update
                .Set("TrainName", train.TrainName)
                .Set("Type", train.Type)
                .Set("From", train.From)
                .Set("To", train.To)
                .Set("DepartureTime", train.DepartureTime)
                .Set("ArrivalTime", train.ArrivalTime)
                .Set("IsActive", train.IsActive)
                .Set("ImageURL", train.ImageURL);
            await _trains.UpdateOneAsync(filter, update);
        }

// Delete a specific train by ID
        public async Task DeleteAsync(string id)
        {
            Console.WriteLine($"Deleting train with ID: {id}");
            FilterDefinition<Train> filter = Builders<Train>.Filter.Eq("Id", id);
            await _trains.DeleteOneAsync(filter);
        }
    }
}
