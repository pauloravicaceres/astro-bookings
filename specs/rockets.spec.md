# Rocket Management API Specification
## Problem Description
- As a travel app operator, I want to manage rockets so that I can offer the right spacecraft options for different mission profiles.
- As a booking administrator, I want to register rocket details so that travel reservations can match rocket capacity and range requirements.
- As a system user, I want rockets classified by range and capacity so that I can filter available vehicles for suborbital, orbital, moon, or Mars trips.
## Solution Overview
- Implement a simple REST API endpoint to create, retrieve, update, and delete rocket records with name, range, and capacity fields.
- Store each rocket with validation for range categories and passenger capacity limits.
- Provide API responses that support rocket management workflows and selection of rocket options for travel bookings.
## Acceptance Criteria
- [ ] GIVEN a rocket management API, WHEN I create a rocket, THEN the API accepts a name, a valid range, and a capacity between 1 and 10.
- [ ] GIVEN a rocket management API, WHEN I request rocket details, THEN the API returns the rocket name, range, and capacity.
- [ ] GIVEN a rocket management API, WHEN I provide an invalid range, THEN the API rejects the request with a validation error.
- [ ] GIVEN a rocket management API, WHEN I provide a capacity outside 1 to 10, THEN the API rejects the request with a validation error.
- [ ] GIVEN a rocket management API, WHEN I list rockets, THEN the API returns all available rockets with their attributes.
- [ ] GIVEN a rocket management API, WHEN I update a rocket, THEN the API persists valid changes to name, range, or capacity.
- [ ] GIVEN a rocket management API, WHEN I delete a rocket, THEN the API removes it from the available rocket list.
- [ ] GIVEN a rocket management API, WHEN a rocket is created or updated successfully, THEN the response includes the stored rocket data.
- [ ] GIVEN a rocket management API, WHEN the API is used for booking selection, THEN rocket information is reliable for mission range and capacity matching.
