import React, { useEffect } from 'react';
import SignInFormCpnt from '../../components/sign-in-form-cpnt/SignInFormCpnt';

const ViewSignIn = (): JSX.Element => {
  return (
    <main className="viewLogin">
      <SignInFormCpnt />
    </main>
  );
};

export default ViewSignIn;
