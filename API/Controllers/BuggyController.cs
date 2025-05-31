using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("not-found")]
    public IActionResult GetNotFound() 
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest() 
    {
        return BadRequest("Ovo nije dobar zahtjev");
    }

    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorised() 
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public IActionResult GetValidationError() 
    {
        ModelState.AddModelError("Problem1", "Ovo je prvi error");
        ModelState.AddModelError("Problem2", "Ovo je drugi error");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError() 
    {
        throw new Exception("Ovo je server error");
    }
}
