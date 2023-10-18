/*
   File Name: TrainController.cs
   Author: G.A.H.A. Nethmini - IT20106874
   Description: This file contains the implementation of the TrainController class
    ,which serves as the controller for train-related operations in the TicketReservation API
    .It provides endpoints for managing trains, including retrieval, creation, updating, and deletion.
*/

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers
{
   [Route("api/trains")]
[ApiController]
public class TrainController : ControllerBase
{
    private readonly TrainService _trainService;

    public TrainController(TrainService trainService)
    {
        _trainService = trainService;
    }

//  GET: api/trains - Retrieve a list of all trains
    [HttpGet]
    public async Task<List<Train>> Get()
    {
        return await _trainService.GetTrainsAsync();
    }

    // GET: api/trains/{id} - Retrieve a specific train by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Train>> Get(string id)
    {
        var train = await _trainService.GetTrainByIdAsync(id);
        if (train == null)
        {
            return NotFound();
        }
        return Ok(train);
    }

    // POST: api/trains - Create a new train for users to book
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Train train)
    {
        await _trainService.CreateAsync(train);
        return CreatedAtAction(nameof(Get), new { id = train.Id }, train);
    }

    // PUT: api/trains/{id} - Update a specific train details
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Train train)
    {
        await _trainService.UpdateTrainAsync(id, train);
        return NoContent();
    }

    // DELETE: api/trains/{id} - Delete a specific train
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _trainService.DeleteAsync(id);
        return NoContent();
    }
}
}