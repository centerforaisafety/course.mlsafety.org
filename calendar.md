---
layout: page
title: Schedule
description: Listing of course modules and topics.
---

# Schedule
Legend: 🎥 lecture recording, 🖥 slides, 📝 review questions, ⌨️ coding assignment.

{% for module in site.modules %}
{{ module }}
{% endfor %}
