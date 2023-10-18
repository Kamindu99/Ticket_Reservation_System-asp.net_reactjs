
  /*
    File Name: UserController.cs
    Author: S.A.V.J. Senadeera - IT20219420
    Description: This file contains the implementation of the UserController class,
        which serves as the controller for user-related operations in the TicketReservation API.
        It provides endpoints for user management, including user retrieval, creation, login, update, and deletion.
        Additionally, it allows deactivating and reactivating user accounts.
    */

using System;
using Microsoft.AspNetCore.Mvc;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers;

[Controller]
[Route("api/[controller]")]

public class UserController : Controller {

    private readonly UserService _mongoDBService;

    public UserController(UserService mongoDBService) {
        _mongoDBService = mongoDBService;
    }



    //GET: api/user - Retrieve a list of all users
    [HttpGet]
   
    public async Task<List<User>> Get() {

        return await _mongoDBService.GetUsersAsync();
    }

    // POST: api/user - Create a new user
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] User user) {
        await _mongoDBService.CreateAsync(user);
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);


    }
    // POST: api/user/login - Login a user
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user) {
        var user1 = await _mongoDBService.loginAsync(user.Nic, user.Password);
        if (user1 == null) {
            return NotFound();
        }
        return Ok(user1);
    }
  
    // PUT: api/user/{id} - Update a specific user details
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] User user) {
        await _mongoDBService.UpdateUserAsync(id, user);
        return NoContent();
    }

    
    // GET: api/user/{id} - Retrieve a specific user details

    [HttpGet("{id}")]
    public async Task<User> Get(string id) {
        return await _mongoDBService.GetUserByIdAsync(id);
    }
    


    // DELETE: api/user/{id} - Delete a specific user
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
        await _mongoDBService.DeleteAsync(id);
        return NoContent();
    }

    // PUT: api/user/deactivate/{id} - Deactivate a specific user
       [HttpPut("deactivate/{id}")]
    public async Task<IActionResult> Deactivate(string id) {
        await _mongoDBService.DeactivateAsync(id);
        return NoContent();
    }

    // PUT: api/user/activate/{id} - Activate a specific user
       [HttpPut("activate/{id}")]
    public async Task<IActionResult> Activate(string id) {
        await _mongoDBService.ActivateAsync(id);
        return NoContent();
    }   



}


