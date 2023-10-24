

/*
    File Name: UserService.cs
    Author: S.A.V.J. Senadeera - IT20219420
    Description: This file contains the implementation of the UserService class,
        which provides user (traveler) management functionality, 
        including user creation, login, retrieval, update, and deletion.
        It also allows deactivating and reactivating user accounts.
*/


using TicketReservation.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using BCrypt.Net;

namespace TicketReservation.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
        IMongoDatabase database = client.GetDatabase("TrainGoDB");
        _users = database.GetCollection<User>("Users");
    }


    //create a new user(traveler) in the TrainGoDB
    public async Task CreateAsync(User user)
    {
        var filter = Builders<User>.Filter.Eq("Nic", user.Nic);
        var user1 = await _users.Find(filter).FirstOrDefaultAsync();
        if (user1 != null)
        {
            Console.WriteLine("User already exists");
            return;
        }
        else
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashedPassword;
            await _users.InsertOneAsync(user);
            Console.WriteLine("User created");
        }

        return;
    }


    //login user from checking NIC and password

    public async Task<User> loginAsync(string nic, string password)
    {
        Console.WriteLine("User login");
        var filter = Builders<User>.Filter.Eq("Nic", nic);
        var user = await _users.Find(filter).FirstOrDefaultAsync();
        if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            if (user.Active == false)
            {
                throw new Exception("Account Deactivated");
            }
            return user;
        }
        else
        {
            throw new Exception("Invalid Credentials");
        }

    }


    //get all users(travelers) list from the TrainGoDB
    public async Task<List<User>> GetUsersAsync()
    {
        Console.WriteLine("User get");
        return await _users.Find(new BsonDocument()).ToListAsync();

    }

    //get details of a specific user by the user ID
    public async Task<User> GetUserByIdAsync(string id)
    {
        Console.WriteLine($"Getting user by ID: {id}");
        var filter = Builders<User>.Filter.Eq("Id", id);
        return await _users.Find(filter).FirstOrDefaultAsync();
    }


    //update user details by the user ID
    public async Task UpdateUserAsync(string id, User user)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        UpdateDefinition<User> update = Builders<User>.Update.Set("Username", user.Username).Set("Password", user.Password).Set("Email", user.Email).Set("Nic", user.Nic).Set("Active", user.Active);
        await _users.UpdateOneAsync(filter, update);
        return;
    }

    //delete a specific user form the db by the user ID
    public async Task DeleteAsync(string id)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        await _users.DeleteOneAsync(filter);
        return;
    }

    //activate a specific user account
    public async Task DeactivateAsync(string id)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        UpdateDefinition<User> update = Builders<User>.Update.Set("Active", false);
        await _users.UpdateOneAsync(filter, update);
        return;
    }

    //deactivate a specific user account 
    public async Task ActivateAsync(string id)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Id", id);
        UpdateDefinition<User> update = Builders<User>.Update.Set("Active", true);
        await _users.UpdateOneAsync(filter, update);
        return;
    }
}