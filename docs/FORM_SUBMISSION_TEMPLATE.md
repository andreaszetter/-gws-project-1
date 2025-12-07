# Form Submission Template

Use this template when adding ideas from Google Form submissions to IDEAS.md

## Template for IDEAS.md

```markdown
- **Idea Name**: [Copy from form: Idea Title]
- **Core Concept**: [Copy from form: Core Concept]
- **Genre/Type**: [Copy from form: Genre/Type]
- **Category**: [Copy from form: Category]
- **Key Features**: [Copy from form: Detailed Description - if provided]
- **Inspiration**: [Copy from form: Inspiration - if provided]
- **Excitement Level**: [Number/5] (where Number is from form: Priority/Excitement - if provided)
- **Added by**: [Copy from form: Your Name - if provided] - [Submission date from form]

[Copy from form: Additional Comments - if provided]

---
```

## Example

```markdown
- **Idea Name**: Time-Bending Puzzle Game
- **Core Concept**: A puzzle game where you can rewind time to solve environmental puzzles
- **Genre/Type**: Puzzle-Platformer
- **Category**: Game Mechanic
- **Key Features**: 
  - Rewind time up to 30 seconds
  - Objects maintain momentum when time is rewound
  - Create "time echoes" of yourself to solve multi-person puzzles
- **Inspiration**: Inspired by Braid and The Witness
- **Excitement Level**: 4/5
- **Added by**: Alex - 2024-01-15

Additional thoughts: Could work really well with a minimalist art style. Music could play backwards when rewinding!

---
```

## For Detailed Submissions

If the form submission has extensive detail, consider creating a separate document in the appropriate docs folder:

1. Create file in `docs/mechanics/`, `docs/narrative/`, or `docs/technical/`
2. Use filename format: `idea-name-from-form.md`
3. Include all form details in a structured format
4. Add a reference in IDEAS.md pointing to the detailed doc

Example reference in IDEAS.md:
```markdown
- **Idea Name**: Time-Bending Puzzle Game
- **Summary**: A puzzle game where you can rewind time to solve environmental puzzles
- **Added by**: Alex - 2024-01-15
- **Details**: See [detailed mechanics document](docs/mechanics/time-bending-puzzles.md)

---
```

## Commit Message Format

When committing form submissions, use clear commit messages:

```
Add idea from form: [Idea Title]
```

or if multiple submissions:

```
Add form submissions: [Idea 1], [Idea 2], [Idea 3]
```

## Acknowledging Contributors

If the contributor provided their name/email and you have a way to contact them:
- Let them know their idea was added
- Provide a link to where it was added in the repository
- Thank them for contributing!

If they submitted anonymously:
- Simply add the idea with "Anonymous contributor" or "Community submission"
- Example: `**Added by**: Anonymous - 2024-01-15`
