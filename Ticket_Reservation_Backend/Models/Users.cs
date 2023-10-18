/*
   File Name: User.cs
   Author: S.A.V.J. Senadeera - IT20219420
   Description: This file contains the definition of the User class, 
       which represents a user (traveler) in the TicketReservation system. 
       It includes properties for user identification and attributes such as
       username, password, email, NIC (National Identity Card), and account activation status.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace TicketReservation.Models;

public class User
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Nic { get; set; } = null!;
    public bool Active { get; set; } = true;


}