# Functional Requirements

- RF01: Generate exactly six unique random integers between 1 and 60.
- RF02: Display generated numbers on the result page.
- RF03: Allow navigation from the lottery page to registration.
- RF04: Require a valid name and email before enabling submission.
- RF05: Display validation messages for invalid registration inputs.
- RF06: Add valid registrations to the in-memory user list.
- RF07: Clear registration fields after successful submission.

# Current Constraints

- Lottery generation is simulated locally without an HTTP API.
- Registrations are not persisted across page reloads.
- Selecting between six and nine numbers is not implemented.
