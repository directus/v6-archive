#### Example Schema: _Project Management_

```
database
├── projects
│   ├── id
│   ├── active
│   ├── title
│   ├── description
│   ├── url
│   ├── client
│   ├── date_started
│   ├── project_manager
│   └── sow_pdf
├── clients
│   ├── id
│   ├── logo_image
│   ├── name
│   ├── hourly_rate
│   ├── point_of_contact_email
│   ├── point_of_contact_name
│   └── point_of_contact_phone
├── tasks
│   ├── id
│   ├── active
│   ├── sort
│   ├── title
│   ├── category
│   ├── assigned_user
│   ├── created_by
│   ├── date_created
│   └── description
├── task_categories
│   ├── id
│   └── title
└── project_tasks (junction table)
    ├── id
    ├── project_id
    └── task_id
```