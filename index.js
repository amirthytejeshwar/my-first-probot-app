// Deployments API example
// See: https://developer.github.com/v3/repos/deployments/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  app.on(
    ["pull_request.opened", "pull_request.synchronize"],
    async (context) => {
      // Creates a deployment on a pull request event
      // Then sets the deployment status to success
      // NOTE: this example doesn't actually integrate with a cloud
      // provider to deploy your app, it just demos the basic API usage.
      app.log.info(context.payload);

      const payload = context.payload;
      const number = payload.pull_request.number;
      const owner = context.payload.repository.owner.login;
      const repo = context.payload.repository.name;
      let page = 0;
  
      const issue = context.issue();
      // transparently creates an installation access token the first time it is needed
      // and refreshes it when it expires
      let allFiles = await context.octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
        owner: owner,
        repo: repo,
        pull_number: number,
      });
      app.log(allFiles);
    }
  );

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
