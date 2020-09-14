import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonGrid, IonCol, IonRow, IonText, IonTextarea } from '@ionic/react';
import { Container } from 'react-grid-system';
import './Licences.css';

const Licences: React.FC = () => {
   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonButtons slot="start">
                  <IonBackButton text="" defaultHref="/profile" />
               </IonButtons>
               <IonTitle>Licences</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent>

            <Container>


               <IonGrid>
                  <IonRow>
                     <IonText>
                        <h1>Libraries we use</h1>
                     </IonText>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Ionic</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright 2015-present Drifty Co.<br />
                              http://drifty.com/<br /><br />

                              MIT License<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining
                              a copy of this software and associated documentation files (the
                              "Software"), to deal in the Software without restriction, including
                              without limitation the rights to use, copy, modify, merge, publish,
                              distribute, sublicense, and/or sell copies of the Software, and to
                              permit persons to whom the Software is furnished to do so, subject to
                              the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be
                              included in all copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
                              LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                              OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                              WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Capacitor</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright 2015-present Drifty Co.<br />
                              http://drifty.com/<br /><br />

                              MIT License<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining
                              a copy of this software and associated documentation files (the
                              "Software"), to deal in the Software without restriction, including
                              without limitation the rights to use, copy, modify, merge, publish,
                              distribute, sublicense, and/or sell copies of the Software, and to
                              permit persons to whom the Software is furnished to do so, subject to
                              the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be
                              included in all copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
                              LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                              OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                              WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              MIT License<br /><br />

                              Copyright (c) Facebook, Inc. and its affiliates.<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React scripts</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              MIT License<br /><br />

                              Copyright (c) 2013-present, Facebook, Inc.<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Redux</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2015-present Dan Abramov<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy of
                              this software and associated documentation files (the "Software"), to deal in the
                              Software without restriction, including without limitation the rights to use,
                              copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
                              Software, and to permit persons to whom the Software is furnished to do so,
                              subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all copies
                              or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                              PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
                              FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                              DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React-Redux</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2015-present Dan Abramov<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy of
                              this software and associated documentation files (the "Software"), to deal in the
                              Software without restriction, including without limitation the rights to use,
                              copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
                              Software, and to permit persons to whom the Software is furnished to do so,
                              subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all copies
                              or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                              PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
                              FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                              DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Redux-Thunk</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2015-present Dan Abramov<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy of
                              this software and associated documentation files (the "Software"), to deal in the
                              Software without restriction, including without limitation the rights to use,
                              copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
                              Software, and to permit persons to whom the Software is furnished to do so,
                              subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all copies
                              or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                              PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
                              FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                              DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React-Microsoft-Login</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              MIT License<br /><br />

                              Copyright (c) 2019 Alexandr Tovmach<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Ionicons</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2015-present Ionic (http://ionic.io/)<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in
                              all copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                              THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React-fontawesome</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright 2018 Fonticons, Inc.<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy of
                              this software and associated documentation files (the "Software"), to deal in
                              the Software without restriction, including without limitation the rights to
                              use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
                              of the Software, and to permit persons to whom the Software is furnished to do
                              so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>React-grid-system</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              MIT License<br /><br />

                              Copyright (c) 2019 Sealninja<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Node.js</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright Node.js contributors. All rights reserved.<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to
                              deal in the Software without restriction, including without limitation the
                              rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
                              sell copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in
                              all copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                              FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                              IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Node-fetch</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2016 - 2020 Node Fetch Team<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy of this
                              software and associated documentation files (the "Software"), to deal in the Software
                              without restriction, including without limitation the rights to use, copy, modify, merge,
                              publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
                              to whom the Software is furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all copies or
                              substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                              BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                              DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Reselect</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              The MIT License (MIT)<br /><br />

                              Copyright (c) 2015-2018 Reselect Contributors<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy
                              of this software and associated documentation files (the "Software"), to deal
                              in the Software without restriction, including without limitation the rights
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                              copies of the Software, and to permit persons to whom the Software is
                              furnished to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                              SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Font Awesome Free</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Font Awesome Free License<br />
                              -------------------------<br /><br />

                              Font Awesome Free is free, open source, and GPL friendly. You can use it for
                              commercial projects, open source projects, or really almost whatever you want.
                              Full Font Awesome Free license: https://fontawesome.com/license/free.<br /><br />

                              # Icons: CC BY 4.0 License (https://creativecommons.org/licenses/by/4.0/)
                              In the Font Awesome Free download, the CC BY 4.0 license applies to all icons
                              packaged as SVG and JS file types.<br /><br />

                              # Fonts: SIL OFL 1.1 License (https://scripts.sil.org/OFL)
                              In the Font Awesome Free download, the SIL OFL license applies to all icons
                              packaged as web and desktop font files.<br /><br />

                              # Code: MIT License (https://opensource.org/licenses/MIT)
                              In the Font Awesome Free download, the MIT license applies to all non-font and
                              non-icon files.<br /><br />

                              # Attribution
                              Attribution is required by MIT, SIL OFL, and CC BY licenses. Downloaded Font
                              Awesome Free files already contain embedded comments with sufficient
                              attribution, so you shouldn't need to do anything additional when using these
                              files normally.<br /><br />

                              We've kept attribution comments terse, so we ask that you do not actively work
                              to remove them from files, especially code. They're a great way for folks to
                              learn about Font Awesome.<br /><br />

                              # Brand Icons
                              All brand icons are trademarks of their respective owners. The use of these
                              trademarks does not indicate endorsement of the trademark holder by Font
                              Awesome, nor vice versa. **Please do not use brand logos for any purpose except
                              to represent the company, product, or service to which they refer.**<br /><br />

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Typescript</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright 2014-present Microsoft<br /><br />

                              Licensed under the Apache License, Version 2.0 (the "License");
                              you may not use this file except in compliance with the License.
                              You may obtain a copy of the License at<br /><br />

                              http://www.apache.org/licenses/LICENSE-2.0<br /><br />

                              Unless required by applicable law or agreed to in writing, software
                              distributed under the License is distributed on an "AS IS" BASIS,
                              WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                              See the License for the specific language governing permissions and
                              limitations under the License.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Date-fns</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright © 2020 Sasha Koss<br /><br />

                              Permission is hereby granted, free of charge, to any person obtaining a copy 
                              of this software and associated documentation files (the “Software”), to deal 
                              in the Software without restriction, including without limitation the rights 
                              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
                              copies of the Software, and to permit persons to whom the Software is furnished
                              to do so, subject to the following conditions:<br /><br />

                              The above copyright notice and this permission notice shall be included in all
                              copies or substantial portions of the Software.<br /><br />

                              THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
                              PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
                              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
                              OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
                              SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Microsoft Authentication Library for JavaScript</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT License (the "License").
                           </p>
                        </div>
                     </IonCol>
                  </IonRow>

                  <IonRow>
                     <IonCol>
                        <IonText>
                           <h4>Aerial image of the South Kensington Campus (3)</h4>
                        </IonText>

                        <div>
                           <p className="licenseInfo">
                              Copyright 2020 Imperial College London
                              <br /><br />
                              Photo by Stewart Oak

                           </p>
                        </div>
                     </IonCol>
                  </IonRow>
               </IonGrid>

            </Container>

         </IonContent>
      </IonPage>
   )
}

export default Licences;