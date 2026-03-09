# API Test Cases — PokeAPI

Base URL: `https://pokeapi.co/api/v2`

---

## 1. Pokémon List (pokemonList.cy.js)

**TC-01: Verify GET /pokemon returns status 200**

Steps:
1. Send a GET request to `/pokemon`.

Expected Result: Response status code is `200`.

**TC-02: Verify response body contains "count" as a positive number**

Steps:
1. Send a GET request to `/pokemon`.
2. Check the `count` field in the response body.

Expected Result: `count` exists and is a number greater than `0`.

**TC-03: Verify "results" is a non-empty array**

Steps:
1. Send a GET request to `/pokemon`.
2. Check the `results` field in the response body.

Expected Result: `results` is an array with at least one entry.

**TC-04: Verify each item in "results" has "name" and "url"**

Steps:
1. Send a GET request to `/pokemon`.
2. Iterate through every item in the `results` array.

Expected Result: Every item has a `name` (string) and a `url` (string).

**TC-05: Verify default pagination returns exactly 20 results**

Steps:
1. Send a GET request to `/pokemon` without query parameters.

Expected Result: The `results` array has exactly `20` entries.

**TC-06: Verify "next" and "previous" pagination fields**

Steps:
1. Send a GET request to `/pokemon`.
2. Check the `next` and `previous` fields.

Expected Result: `next` is a valid URL string. `previous` is `null` (first page).

---

## 2. Pokémon Details (pokemonDetails.cy.js)

Note: Tests run for three Pokémon IDs: `1`, `25`, `15`.

**TC-07: Verify GET /pokemon/{id} returns status 200**

Steps:
1. Send a GET request to `/pokemon/{id}`.

Expected Result: Response status code is `200`.

**TC-08: Verify "id" matches the requested ID**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `id` field in the response body.

Expected Result: `id` equals the requested numeric ID.

**TC-09: Verify "name" matches the expected Pokémon name**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `name` field in the response body.

Expected Result: `name` matches the expected value.

**TC-10: Verify "base_experience" is a positive number**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `base_experience` field.

Expected Result: `base_experience` is a number greater than `0`.

**TC-11: Verify "height" is a positive number**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `height` field.

Expected Result: `height` is a number greater than `0`.

**TC-12: Verify "weight" is a positive number**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `weight` field.

Expected Result: `weight` is a number greater than `0`.

**TC-13: Verify "abilities" array has correct structure**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check each entry in the `abilities` array.

Expected Result: `abilities` is a non-empty array. Each entry has `ability.name` (string) and `is_hidden` (boolean).

**TC-14: Verify "types" array has correct structure**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check each entry in the `types` array.

Expected Result: `types` is a non-empty array. Each entry has `type.name` (string).

**TC-15: Verify "stats" array has exactly 6 entries**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check each entry in the `stats` array.

Expected Result: `stats` has exactly `6` entries. Each has `base_stat` (number) and `stat.name` (string).

**TC-16: Verify "sprites.front_default" is a valid URL**

Steps:
1. Send a GET request to `/pokemon/{id}`.
2. Check the `sprites.front_default` field.

Expected Result: `sprites.front_default` is not null and is a valid string URL.
