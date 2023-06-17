import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, provider } from '../../firebase';


const initialState = {
    user: null,
    isLoading: false,
    error: null,
}

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log("user",user);
      console.log("email",user.email, ",", user.displayName);

      return {email : user.email, name: user.displayName, userId : user.uid};
    } catch (error) {
      throw error;
    }
  }
);



export const signUpWithEmail = createAsyncThunk(
  'user/signUpWithEmail',
  async ({ firstName, lastName, email, password }) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user profile with first name and last name
      await updateProfile( user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Return the user data
      console.log(user);
      return { email: user.email, name: user.displayName ,userId : user.uid};
    } catch (error) {
      return (error.message);
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  'user/signInWithEmail',
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("sign in", user);
      return { email: user.email, name: user.displayName, userId : user.uid };
    } catch (error) {
      return (error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return email;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout : (state) => {
        state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
    .addCase(signInWithEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(signInWithEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder
    .addCase(signUpWithEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signUpWithEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(signUpWithEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },


});

export const {logout} = userSlice.actions;

export default userSlice.reducer;