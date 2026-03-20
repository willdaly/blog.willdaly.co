---
title: "Designing for Failure: Lessons from Distributed Systems"
date: "2024-03-01"
excerpt: "Reliability isn't about preventing failure — it's about building systems that degrade gracefully when things go wrong."
tags: ["distributed-systems", "reliability", "architecture"]
---

# Designing for Failure: Lessons from Distributed Systems

Every distributed system will fail. Networks partition, disks fill, services crash, deployments go sideways. The question isn't *if* something breaks — it's whether you designed for it.

## Embrace the fallacy of reliable networks

The [Eight Fallacies of Distributed Computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) have been around since the 90s, and teams still stumble on the first one: *the network is reliable*.

In practice:
- Packets get dropped silently
- Connections time out mid-request
- DNS resolution returns stale results

Build every remote call with timeouts, retries with exponential backoff, and circuit breakers. Libraries like [Resilience4j](https://resilience4j.readme.io/) (JVM) or [cockatiel](https://github.com/connor4312/cockatiel) (Node.js) make this straightforward.

## Idempotency is your best friend

When a network request fails, you often don't know if the server received it. Did it process the operation and the response got lost? Or did it never arrive?

The safe answer: make operations idempotent. Run them once, twice, ten times — the result should be the same.

Strategies:
- **Idempotency keys** — clients generate a UUID per operation; servers deduplicate on that key
- **Conditional writes** — `INSERT ... ON CONFLICT DO NOTHING`, optimistic locking with version fields
- **Event sourcing** — append-only logs where reprocessing is safe by design

## Graceful degradation over hard failure

When a dependency is down, don't let the failure cascade. Decide what the degraded experience looks like:

- **Return cached data** with a staleness indicator
- **Disable the feature** rather than error the whole page
- **Queue work** for later processing instead of failing synchronously

A useful mental exercise: for each external dependency, ask "What does my service do if this is completely unavailable for an hour?"

## Observability is not optional

You can't fix what you can't see. Invest early in:

- **Structured logging** — JSON logs that you can query, not strings
- **Distributed tracing** — trace IDs that follow a request across services
- **SLOs over alerts** — define acceptable error rates, then alert on SLO burn rate

The goal is a post-incident investigation that takes minutes, not days.

## Summary

Good distributed systems aren't accident-proof — they're accident-ready. Assume failure is happening right now somewhere in your stack. Design your retry logic, your fallbacks, and your observability tooling before you need them.

The best time to add circuit breakers is before the outage. The second-best time is right after.
