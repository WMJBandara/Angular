Useful commands 

Create an new angular project 
	ng new angular10

Move to angular10 filder
	cd angular10

Open the project by visual studio code IDE
	code .

Open the application
	ng serve --open


Create an new component
	ng generate component department
	ng generate component employee

Adding new service
	ng generate service shared

First we need to register app module and httpclient module in app.module.ts
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/form'

Main files in angular project
package.json
contains all the packages and modules or dependencies that are currently used or needed by this application to run

angular.json
contains configuration options for serving testing and building this project

index.html
finally render to customer
