import React, { useState } from 'react';
import {colors} from '../helpers/config';
import Navigation from '../navigation';

export default function Dashboard(){
   return(
      <div>
         <Navigation dashboard/>
         <h1>Hello</h1>
      </div>
   );
}