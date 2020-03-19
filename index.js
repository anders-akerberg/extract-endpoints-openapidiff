const core = require('@actions/core');
try {
  let openapidiff = core.getInput('openapidiff');
  if (openapidiff && openapidiff.length > 0) {
    openapidiff = openapidiff.replace(
      'Breaking changes found between the two specifications:',
      ''
    );

    const asJson = JSON.parse(openapidiff);
    let breakingChanges = [];
    if (asJson.breakingDifferences) {
      asJson.breakingDifferences.forEach(breakingChange => {
        if (breakingChange.sourceSpecEntityDetails) {
          breakingChange.sourceSpecEntityDetails.forEach(
            sourceSpecEntityDetail => {
              if (sourceSpecEntityDetail.location) {
                breakingChanges.push(sourceSpecEntityDetail.location);
              }
            }
          );
        }
      });
    }
    core.setOutput('endpoints', breakingChanges);
  } else {
    throw 'Invalid input please send JSON!';
  }
} catch (error) {
  core.setFailed(error.message);
}
