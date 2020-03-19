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
              if (
                sourceSpecEntityDetail.location &&
                sourceSpecEntityDetail.value
              ) {
                breakingChanges.push({
                  location: sourceSpecEntityDetail.location
                });
              }
            }
          );
        }
      });
    }
    let returnValue = '| Path |\n|-------------|\n|';

    if (breakingChanges.length == 0) {
      returnValue += ` N/A | No breaking changes reported `;
    } else {
      breakingChanges.forEach(change => {
        returnValue += `${change.location} |\n`;
      });
    }
    core.setOutput('openapidiffmarkdown', returnValue);
  } else {
    throw 'Invalid input please send JSON!';
  }
} catch (error) {
  core.setFailed(error.message);
}
