## Useful commands ##

Create an new angular project

**_ng new angular10_**

Move to angular10 folder

**_cd angular10_**

Open the project by visual studio code IDE

**_code ._**

Open the application
	
**_ng serve --open_**


Create an new component
	
**_ng generate component department
ng generate component employee_**

Adding new service

**_ng generate service shared_**

### First we need to register app module and httpclient module in app.module.ts ###
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/form'

### Main files in angular project ###

**package.json**
contains all the packages and modules or dependencies that are currently used or needed by this application to run

**angular.json**
contains configuration options for serving testing and building this project

**index.html**
finally render to customer

