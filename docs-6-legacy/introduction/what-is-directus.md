# What is Directus?

> **Open-Source Headless CMS & Content Delivery API**

Directus Core is a free and open-source self-hosted platform published under the GNU (v3) license. It provides a simple and intuitive web interface for managing database content with completely custom architectures.

## What is a Headless CMS?
Traditional CMS are built specifically to quickly deploy and manage websites – typically simple sites and blogs. However, today’s content is consumed by a much wider range of applications, including complex web platforms, native apps, wearables, kiosks, IoT devices, and other data-driven projects.

Content should be created and managed independently from the place it will be used. By decoupling and authoring application-agnostic content, you gain the freedom to use it *anywhere*. Moreover, you can use it *everywhere*, since you are no longer limited to a single platform.

## Database Mirroring
Directus differs from other CMS in that it directly mirrors your database – essentially making it a safe and client-friendly database GUI. Instead of your content being stored in a proprietary blackbox datastore, Directus gives you complete control over optimizing the actual database architecture based on your specific project needs. Whether managing an existing or new database, Directus and its API will always stay up to date with schema changes.

## Your Data
Directus only manages your database, not your project, so it doesn't stand between you and your content. All system info is stored in separate tables, so your data always remains pure and unmuddled. There are three ways to access your data:

* **Directus API** – You can use our RESTful API to make calls to endpoints and get JSON responses
* **SDKs** – We have a growing number of language-specific SDKs available.
	* PHP – This SDK allows for local (database) and remote (API) connections.
	* Node.js – This SDK allows for remote (API) connections. Local connections will be available soon.
* **Direct to Database** – You can also connect directly to the database using any other method you prefer.

## What is Directus Hosted?
Directus Hosted is a highly scalable DBaaS (Database as a Service) platform built with, and extending, the Directus Core codebase. It allows you to quickly create and manage multiple instances of Directus, each with it's own asset storage and custom content delivery API endpoints. We handle the servers, storage, and setup – so you can focus on your project.
