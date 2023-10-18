/*
   File Name: Admin.cs
    Author: G.U.L.K.Perera - IT20236250
   Description: This file contains the definition of the Admin class, 
   which represents an admin user in the TicketReservation system. 
   It includes properties for identifying admin users, such as
    name, email, password, mobile number, and user role.

   */
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string MobileNumber { get; set; }

        public string UserRole { get; set; }
    }
}
