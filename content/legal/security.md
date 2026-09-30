---
title: "Security"
description: "How FairBazaar secures its website, SaaS products and the software it builds: encryption, access control, secure development, monitoring and responsible disclosure."
updated: "2026-09-30"
---

Security is part of how we design, build and operate software — for our own products and for the platforms we build for clients. This page describes our practices. We do not claim certifications we have not obtained; any future certifications will be listed here with verifiable details.

## Application security
- HTTPS-only access with HSTS and modern TLS.
- Security headers including Content Security Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy.
- Input validation on every server endpoint, output encoding to prevent XSS, and same-origin checks for state-changing requests.
- Rate limiting and spam protection on public forms.

## Access control
- Role-based access control with least privilege.
- Secure authentication; support for single sign-on in enterprise deployments.
- Audit logs for sensitive actions.

## Data protection
- Encryption in transit; encryption at rest on managed infrastructure where supported.
- Secrets stored in environment configuration, never in source code or browser bundles.
- Regular backups with restoration testing.

## Secure development
- Code review, dependency monitoring and vulnerability patching.
- Separate development, staging and production environments.
- Automated testing and CI/CD pipelines.

## AI systems
- Permission-aware retrieval so users only see information they are entitled to.
- Human approval for sensitive AI agent actions, and logging of agent activity.
- Configurations that keep customer data out of public model training.

## Responsible disclosure
If you believe you've found a security vulnerability, please report it via our [contact page]({{contactPath}}) with the subject "Security". Please give us reasonable time to investigate and do not access or modify data that isn't yours.
