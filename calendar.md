---
layout: page
title: Schedule
description: Listing of course modules and topics.
permalink: index.html
---
# Schedule
Legend: 🎥 lecture recording, 🛝 slides, 📖 notes, 📝 written questions, ⌨️ coding assignment.

{% for module in site.modules %}
{{ module }}
{% endfor %}
