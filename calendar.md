---
layout: page
title: Schedule
description: Listing of course modules and topics.
permalink: index.html
---

# Schedule

Legend: 🎥 lecture recording, 🛝 slides, 📖 notes, 📝 written questions, ⌨️ coding assignment.
[Apply to participate in the course program](https://airtable.com/shredY1461hyCVYC6) by Jan 29th to have your assignments graded and participate in discussions and speaker events.

{% for module in site.modules %}
{{ module }}
{% endfor %}
