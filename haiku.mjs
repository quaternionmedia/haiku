import core from '@actions/core';
import * as github from '@actions/github';
import syllable from 'syllable';

const token = process.argv[2];
const octokit = github.getOctokit(token);
const context = github.context;

const issue = context.issue;
const issueBody = context.payload.issue.body;

function countSyllables(line) {
    const words = line.split(' ');
    let syllableCount = 0;
    for (const word of words) {
        syllableCount += syllable(word);
    }
    return syllableCount;
}

function isHaiku(text) {
    const lines = text.split('\n');
    for (let i = 0; i <= lines.length - 3; i++) {
        const syllableCounts = lines.slice(i, i + 3).map(line => countSyllables(line));
        if (syllableCounts[0] === 5 && syllableCounts[1] === 7 && syllableCounts[2] === 5) {
            return true;
        }
    }
    return false;
}

if (isHaiku(issueBody)) {
    github.rest.issues.addLabels({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        labels: ['haiku 🐸']
    });
}