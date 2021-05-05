import React from 'react';
import SignInFormCpnt from '../../components/sign-in-form-cpnt/SignInFormCpnt';

type SignInFormProps = {
  handleIsAuthenticated: () => void;
};

const ViewSignIn = ({
  handleIsAuthenticated,
}: SignInFormProps): JSX.Element => {
  return (
    <main className="viewLogin">
      <SignInFormCpnt handleIsAuthenticated={handleIsAuthenticated} />
    </main>
  );
};

export default ViewSignIn;
