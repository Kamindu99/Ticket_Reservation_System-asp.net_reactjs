/*
   File Name: BookingController.cs
   Author: W.W.L.K.G. Wanigasinghe - IT20218744
   Description: This file contains the implementation of the BookingController class
   , which serves as the controller for booking-related operations in the TicketReservation API.
    It provides endpoints for managing bookings, including retrieval, creation, updating, and deletion.

 */

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }


        //  GET: api/booking - Retrieve a list of all bookings
        [HttpGet]
        public async Task<List<BookingDetails>> Get()
        {
            return await _bookingService.GetBookingsAsync();
        }

        //  GET: api/booking/{id} - Retrieve a specific booking by id
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDetails>> Get(string id)
        {
            var bookingDetails = await _bookingService.GetBookingDetailsByIdAsync(id);
            if (bookingDetails == null)
            {
                return NotFound();
            }
            return Ok(bookingDetails);
        }

        //  GET: api/booking/mybookings/{CusId} - Retrieve a specific booking by customer id

        [HttpGet("mybookings/{CusId}")]
        public async Task<List<BookingDetails>> GetByUserID(string CusId)
        {
            return await _bookingService.GetBookingDetailsByUserIdAsync(CusId);
        }

        // POST: api/booking - Create a new ticket booking 
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BookingDetails bookingDetails)
        {
            await _bookingService.CreateAsync(bookingDetails);
            return CreatedAtAction(nameof(Get), new { id = bookingDetails.Id }, bookingDetails);
        }

        // PUT: api/booking/{id} - Update a specific booking details
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] BookingDetails bookingDetails)
        {
            await _bookingService.UpdateBookingAsync(id, bookingDetails);
            return NoContent();
        }

        // DELETE: api/booking/{id} - Delete a specific booking
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _bookingService.DeleteAsync(id);
            return NoContent();
        }
    }
}