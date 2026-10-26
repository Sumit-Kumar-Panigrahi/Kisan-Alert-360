# Sample Data and Test Cases

All data here is **synthetic** and used for the demo. No real farmer data is included.

## 1. Sample data (`sample-data/`)

| File | Contents |
|---|---|
| `sensors.json` | Simulated soil-moisture, temperature and rainfall readings for two demo fields |
| `alerts.json` | Simulated community alerts (pest, disease, flood) |
| `schemes.json` | Sample scheme summaries in English, Hindi and Odia, with official portal links |
| `voice_queries.json` | Example assistant questions in all three languages |

## 2. Automated tests

These check that the sample data is well-formed. Run:

```bash
npm install --save-dev vitest
npm test            # package.json: "test": "vitest run"
```

Test file: [`tests/sample-data.test.ts`](../tests/sample-data.test.ts)

Checks:
- every file parses as JSON and is a non-empty array
- required fields are present and correctly typed
- sensor values are within plausible ranges
- each scheme has English, Hindi and Odia text and an official `https://` link
- voice queries cover `en`, `hi` and `or`

## 3. Manual test cases

| ID | Test | Expected behaviour |
|---|---|---|
| VOICE-01 | Ask a short English question with a valid key | Answer appears and is read aloud |
| VOICE-02 | Select Hindi, ask a question | Reply is in Hindi; speech language `hi-IN` |
| VOICE-03 | Select Odia, ask a question | Reply is in Odia; speech language `or-IN` |
| VOICE-04 | Submit an empty message | No request is sent |
| VOICE-05 | Gemini key missing | Clear setup message; no crash |
| VOICE-06 | Browser without speech recognition | Warning shown; text chat still works |
| VOICE-07 | API rate limit (HTTP 429) | Friendly error; app stays usable |
| LEAF-01 | Clear photo of one crop leaf | Passes validation; result with confidence |
| LEAF-02 | Photo of a person or object | Rejected with explanation |
| LEAF-03 | Blurry or dark photo | Rejected as not clearly visible |
| LEAF-04 | Low-confidence diagnosis (under 70%) | Shown as uncertain, with advice to consult a KVK |
| LEAF-05 | Unsupported or corrupted file | Useful error; no crash |
| WATER-01 | Open Water Budget Planner with sample field data | Plan renders without errors |
| COMM-01 | View community alerts from `alerts.json` | Alerts listed with type, place and time |
| SCHEME-01 | Open a scheme | Local-language summary shown; link opens the official portal |
| LANG-01 | Switch between Odia, Hindi and English | All visible labels change |
| BUILD-01 | `npm run build` | Completes without errors |
| BUILD-02 | `npm run lint` | Completes; issues reviewed |

## 4. Results log

Fill in after running. Do not record a pass unless it was observed.

| Test ID | Result (Pass / Fail / Blocked) | Date | Notes / evidence |
|---|---|---|---|
| DATA (automated) | | | |
| VOICE-01 | | | |
| VOICE-03 | | | |
| LEAF-01 | | | |
| LEAF-02 | | | |
| SCHEME-01 | | | |
| BUILD-01 | | | |
