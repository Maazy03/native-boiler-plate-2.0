// export const apiUrl = 'https://lac-app-backend.herokuapp.com';
// export const apiUrl = 'https://5dc3-103-244-178-85.ngrok.io';
// export const apiUrl = 'https://backend.leanderathleticclub.com'; // LIVE RELEASE purpose
export const apiUrl = 'https://infinite-beach-21974.herokuapp.com'; // DEPLOYMENT(STAGING) purpose=

export const imageUrl = `${apiUrl}/api/images/`;

export const URL = link => {
  return `${apiUrl}/api/v1/${link}`;
};

export default function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};

export const maxContentLength = 30;
