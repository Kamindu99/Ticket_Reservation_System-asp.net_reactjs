/*
   File Name: AdminController.cs
   Author: G.U.L.K.Perera - IT20236250
   Description: This file contains the implementation of the AdminController class,
    which serves as the controller for admin-related operations in the TicketReservation API.
    It provides endpoints for managing admin users,
    including retrieval, creation, updating, and deletion, as well as login functionality.
*/

using System;
using Microsoft.AspNetCore.Mvc;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers;

[Controller]
[Route("api/[controller]")]

public class AdminController : Controller {

    private readonly AdminUserService _adminUserService;

    public AdminController(AdminUserService adminService) {
        _adminUserService = adminService;
    }


// GET: api/admin - Retrieve a list of all admin users
    [HttpGet]
   
    public async Task<List<Admin>> Get() {

        return await _adminUserService.GetUsersAsync();
    }

// POST: api/admin - Create a new admin user
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Admin admin) {
        await _adminUserService.CreateAsync(admin);
        return CreatedAtAction(nameof(Get), new { id = admin.Id }, admin);


    }

// POST: api/admin/login - Login an admin user
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Admin admin) {
        var user1 = await _adminUserService.loginAsync(admin.Email, admin.Password);
        if (user1 == null) {
            return NotFound();
        }
        return Ok(user1);
    }
  // PUT: api/admin/{id} - Update a specific admin user details
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] Admin admin) {
        await _adminUserService.UpdateUserAsync(id, admin);
        return NoContent();
    }


// DELETE: api/admin/{id} - Delete a specific admin user
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
        await _adminUserService.DeleteAsync(id);
        return NoContent();
    }



}


