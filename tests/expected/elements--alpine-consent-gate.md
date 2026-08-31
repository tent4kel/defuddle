```json
{
  "title": "Alpine Consent Gate",
  "author": "",
  "site": "",
  "published": ""
}
```

## Article With An Embedded Post Behind A Consent Gate

This is the first paragraph of the article body, padded with enough sentences that the content scoring heuristics treat it as real article content rather than boilerplate text that should be discarded during extraction. It needs to be long enough, with enough distinct words, that the overall word count of this fixture stays comfortably above any low-content retry threshold the pipeline might otherwise trigger.

This is a second real paragraph of genuine article content, again padded with plenty of unique wording so that the surrounding text reads as a normal, full-length article rather than a short stub. The point is to make sure the consent-gate removal below is exercised through selector matching specifically, not through a side effect of the scorer treating the whole short document as low-value.

This is a third paragraph of real article content, continuing the discussion with additional distinct padding text so that the removeLowScoring and link-density checks don't mistake this fixture for a navigation block or an index page.

A fourth and final paragraph rounds out the article body with more genuine content, ensuring the fixture reads like a normal, substantial article throughout rather than a minimal reproduction case.