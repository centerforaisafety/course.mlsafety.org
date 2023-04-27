---
layout: page
title: Schedule
description: Listing of course modules and topics.
permalink: index.html
---

# Schedule

Legend: 🎥 lecture recording, 🖥️ slides, 📖 notes, 📝 written questions, ⌨️ coding assignment.\
[Get notified when applications open for the next semester of the course.](https://airtable.com/shruI8noZFrsgIpvD) Participate in our course to have your assignments graded and join in discussions with other students.

{% for module in site.modules %}
{{ module }}
{% endfor %}
