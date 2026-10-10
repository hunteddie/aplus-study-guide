# A+ Study Guide web app: setup

This folder is the installable version of the study guide. It needs two free accounts:

- **GitHub** puts the app on the internet so your phone can open it.
- **Supabase** provides the sign-in and stores your progress.

The app works after Part 1 alone, saving progress on each device separately. Part 2 adds accounts.
Menu names on these sites change from time to time. If one differs from what is written here, look for the closest match.

## What is in this folder

| File | What it is |
|---|---|
| `index.html` | The app: questions, flashcards, review schedule, sign-in screen |
| `config.js` | Your Supabase settings. The only file you edit |
| `manifest.webmanifest` | Tells a phone the app's name, icon and colors |
| `sw.js` | Keeps a copy on the device so the app opens offline |
| `icons/` | The home-screen icons |
| `lib/supabase.js` | Supabase's library for sign-in and the database |
| `supabase.sql` | The database setup you run once in Supabase |

## Part 1: Put it online with GitHub Pages

1. Create an account at https://github.com if you do not have one.
2. Create a new repository. Name it `aplus-study-guide`, set it to **Public**, and tick **Add a README file**.
3. In the repository, choose **Add file > Upload files**. Drag in everything inside this `web-app` folder, including the `icons` and `lib` folders. Then choose **Commit changes**.
4. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait a minute or two and refresh. The page shows your address, in the form `https://YOUR-USERNAME.github.io/aplus-study-guide/`. Open it to check the app loads.

## Part 2: Add accounts with Supabase

1. Create an account at https://supabase.com and create a new project. It asks for a database password: save it in a password manager. You will not need it for this app, but you cannot view it again later.
2. Open the **SQL Editor**, start a new query, paste the whole contents of `supabase.sql`, and run it. It should finish with "Success".
3. Open **Authentication > URL Configuration**. Set **Site URL** to your GitHub Pages address from Part 1, and add the same address under **Redirect URLs**. This is where the confirmation email sends you back to.
4. Find your project's **URL** and **publishable key**. They are in the **Connect** dialog at the top of the project, or under **Settings > API Keys**. The publishable key starts with `sb_publishable_`.
5. On GitHub, open `config.js`, choose the pencil icon to edit it, paste the two values between the quotes, and commit:

   ```js
   window.APP_CONFIG = {
     supabaseUrl: "https://abcdefgh.supabase.co",
     supabaseKey: "sb_publishable_..."
   };
   ```

6. Wait a minute, then reload your app. A sign-in form now appears on the home screen. Choose **Create account**, open the confirmation email, tap the link, then return and sign in.

## Part 3: Install it on your iPhone

1. Open your GitHub Pages address in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Open the app from its new icon and sign in. The installed app keeps its own sign-in, separate from Safari.

## Good to know

- **The publishable key is meant to be public.** It only lets the app make requests. What each person can read or change is decided by the row level security rules in `supabase.sql`: a signed-in person can reach their own row and nothing else. Never put a key labeled "secret" in `config.js`, because everything in this folder is visible to anyone.
- **Free Supabase projects pause after about a week without use.** Nothing is lost. Open the Supabase dashboard and choose to resume the project. Until then the app keeps working and saves on the device.
- **Confirmation emails are limited** on Supabase's built-in email service, to a few per hour. That is plenty for your own use.
- **To update the app later,** upload the changed file to GitHub. Phones pick up the new version the next time they open the app with a connection.
- **Progress from before you sign in is kept.** When you sign in, what is on the device is combined with what is in your account, keeping the most recent answer for each question.
