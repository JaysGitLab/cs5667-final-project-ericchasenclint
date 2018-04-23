see https://github.com/angular/material2/releases/tag/2.0.0-beta.12 for the starter code for the autocomplete box.

The way compontents get nested is based on this blog post: https://medium.com/spektrakel-blog/angular2-building-nested-reactive-forms-7978ecd145e4. 

The parent component calls a static method of the child to get a FormGroup with a FormControl in it that is setup appropriately for the child. The parent component then passes that FormGroup to a child instance as an @Input to do with as it pleases.

FormGroup, FormControl, and FormArray all implement AbstractControl.

The AbstractControl `get(path: string)` method returns a child AbstractControl by dot separated path. 

The FormArray `at(index: number)` returns the child AbstractControl at `index`.
