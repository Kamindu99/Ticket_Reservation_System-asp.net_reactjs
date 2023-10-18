/*
    File Name: User.cs
    Author: G.A.H.A. Nethmini - IT20106874
    Description: This file contains the definition of the User class, 
        which represents a user (traveler) in the TicketReservation system. 
        It includes properties for user identification and attributes such as
        username, password, email, NIC (National Identity Card), and account activation status.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace TicketReservation.Models
{
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string TrainName { get; set; } = null!;
        
        public string Type { get; set; } = null!;

        public string From { get; set; } = null!;

        public string To { get; set; } = null!;

        public string DepartureTime { get; set; } = null!;

        public string ArrivalTime { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        public string? ImageURL { get; set; } = null!;
    }
}
