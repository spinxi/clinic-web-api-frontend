# Preread && Configure

Just git clone project and run 
> <code>cd clinic-web-api-frontend</code>
>
><code>ng serve</code>

Project was done in less than 2 days so there is missing some components (80% of work is done).

## Structure
<pre>
  └───src
    │   favicon.ico
    │   index.html
    │   main.server.ts
    │   main.ts
    │   styles.css
    │
    ├───app
    │   │   app.component.css
    │   │   app.component.html
    │   │   app.component.spec.ts
    │   │   app.component.ts
    │   │   app.config.server.ts
    │   │   app.config.ts
    │   │   app.routes.ts
    │   │
    │   ├───auth
    │   │       auth.guard.spec.ts
    │   │       auth.guard.ts
    │   │       auth.service.spec.ts
    │   │       auth.service.ts
    │   │
    │   ├───components
    │   │   ├───calendar
    │   │   │       calendar.component.css
    │   │   │       calendar.component.html
    │   │   │       calendar.component.spec.ts
    │   │   │       calendar.component.ts
    │   │   │
    │   │   ├───footer
    │   │   │       footer.component.css
    │   │   │       footer.component.html
    │   │   │       footer.component.spec.ts
    │   │   │       footer.component.ts
    │   │   │
    │   │   ├───header
    │   │   │       header.component.css
    │   │   │       header.component.html
    │   │   │       header.component.spec.ts
    │   │   │       header.component.ts
    │   │   │
    │   │   ├───header-banner
    │   │   │       header-banner.component.css
    │   │   │       header-banner.component.html
    │   │   │       header-banner.component.spec.ts
    │   │   │       header-banner.component.ts
    │   │   │
    │   │   ├───header-search
    │   │   │       header-search.component.css
    │   │   │       header-search.component.html
    │   │   │       header-search.component.spec.ts
    │   │   │       header-search.component.ts
    │   │   │
    │   │   ├───home-doctors
    │   │   │       home-doctors.component.css
    │   │   │       home-doctors.component.html
    │   │   │       home-doctors.component.spec.ts
    │   │   │       home-doctors.component.ts
    │   │   │
    │   │   ├───home-sidebar
    │   │   │       home-sidebar.component.css
    │   │   │       home-sidebar.component.html
    │   │   │       home-sidebar.component.spec.ts
    │   │   │       home-sidebar.component.ts
    │   │   │
    │   │   ├───login
    │   │   │       login.component.css
    │   │   │       login.component.html
    │   │   │       login.component.spec.ts
    │   │   │       login.component.ts
    │   │   │
    │   │   └───login-modal
    │   │           login-modal.component.css
    │   │           login-modal.component.html
    │   │           login-modal.component.spec.ts
    │   │           login-modal.component.ts
    │   │
    │   ├───interfaces
    │   │       auth-response.ts
    │   │       login-request.ts
    │   │       register-request.ts
    │   │
    │   ├───pages
    │   │   ├───category
    │   │   │       category.component.css
    │   │   │       category.component.html
    │   │   │       category.component.spec.ts
    │   │   │       category.component.ts
    │   │   │
    │   │   ├───confirm-email
    │   │   │       confirm-email.component.css
    │   │   │       confirm-email.component.html
    │   │   │       confirm-email.component.spec.ts
    │   │   │       confirm-email.component.ts
    │   │   │
    │   │   ├───home
    │   │   │       home.component.css
    │   │   │       home.component.html
    │   │   │       home.component.spec.ts
    │   │   │       home.component.ts
    │   │   │
    │   │   ├───profile
    │   │   │       profile.component.css
    │   │   │       profile.component.html
    │   │   │       profile.component.spec.ts
    │   │   │       profile.component.ts
    │   │   │
    │   │   └───register
    │   │           register.component.css
    │   │           register.component.html
    │   │           register.component.spec.ts
    │   │           register.component.ts
    │   │
    │   └───services
    │       ├───api-service
    │       │       category-api.service.spec.ts
    │       │       category-api.service.ts
    │       │
    │       ├───booking
    │       │       booking.service.spec.ts
    │       │       booking.service.ts
    │       │
    │       ├───doctor-service
    │       │       doctor.service.spec.ts
    │       │       doctor.service.ts
    │       │
    │       ├───local-storage
    │       │       local-storage.service.spec.ts
    │       │       local-storage.service.ts
    │       │
    │       └───notify
    │               notify.service.spec.ts
    │               notify.service.ts
    │
    ├───assets
    │   │   .gitkeep
    │   │
    │   ├───css
    │   │       card.css
    │   │       root.css
    │   │       toast.css
    │   │
    │   └───images
    │           200x200.png
    │           delete.png
    │           edit.png
    │           eye.png
    │           location.png
    │           logo-header.png
    │           logo_white.png
    │           pin.png
    │           slider.png
    │           star.png
    │
    └───environments
            environment.development.ts
            environment.ts
</pre>
