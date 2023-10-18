/*
   File Name: BookingDetails.cs
   Author: W.W.L.K.G. Wanigasinghe - IT20218744
   Description: This file contains the definition of the BookingDetails class
   , which represents booking details in the TicketReservation system. 
   It includes properties for identifying booking details, 
   customer information, booking date, travel details, and payment information.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace TicketReservation.Models
{
    public class BookingDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string CusName { get; set; } = null!;

        public string CusNIC { get; set; } = null!;

        public string CusId { get; set; } = null!;

        public string Bookdate { get; set; } = null!;

        public string From { get; set; } = null!;

        public string To { get; set; } = null!;

        public string Traintime { get; set; } = null!;

        public string NoOfTickets { get; set; } = null!;

        public string TrainClass { get; set; } = null!;

        public string Total { get; set; } = null!;

        public string TrainId { get; set; } = null!;

        public string TrainName { get; set; } = null!;

        public string Status { get; set; } = "Pending";

        public string BookedDate { get; set; } = DateTime.Now.ToString("yyyy/MM/dd");
    }
}
