# Contributing to Telyab
=====================================

Thank you for your interest in contributing to Telyab! We welcome contributions from anyone, and we're excited to have you on board.

## Fork Guide
-------------

To get started, follow these steps to fork the repository:

1. **Fork the repository**: Click the "Fork" button at the top-right corner of this page to create a copy of the repository in your own GitHub account.
2. **Clone the repository**: Run `git clone https://github.com/your-username/telyab.git` (replace `your-username` with your actual GitHub username) to create a local copy of the repository on your machine.
3. **Configure the upstream repository**: Run `git remote add upstream https://github.com/original-owner-username/telyab.git` (replace `original-owner-username` with the actual username of the repository owner) to link your local repository to the original repository.
4. **Verify the upstream repository**: Run `git remote -v` to verify that the upstream repository has been added correctly.

## Branch Naming
---------------

When creating a new branch, please follow these naming conventions:

* **Feature branches**: Use the format `feature/your-feature-name` (e.g., `feature/add-new-login-system`)
* **Bug fix branches**: Use the format `fix/your-bug-fix-name` (e.g., `fix/login-issue`)
* **Documentation branches**: Use the format `docs/your-docs-change` (e.g., `docs/update-contributing-guidelines`)
* **Release branches**: Use the format `release/your-release-version` (e.g., `release/v1.2.3`)

## Conventional Commits
---------------------

We use Conventional Commits to format our commit messages. Please follow these guidelines:

* **Commit message format**: Use the format `type: brief description` (e.g., `feat: add new login system`)
* **Commit types**: Use one of the following types:
	+ `feat` for new features
	+ `fix` for bug fixes
	+ `docs` for documentation changes
	+ `style` for code style changes
	+ `refactor` for code refactoring
	+ `perf` for performance improvements
	+ `test` for test additions or changes
	+ `chore` for miscellaneous changes

## PR Checklist
--------------

Before submitting a pull request, please ensure that you've completed the following:

* **Tested your changes**: Verifies that your changes work as expected and don't introduce any new bugs.
* **Updated documentation**: If your changes affect documentation, please update the relevant documentation files.
* **Formatted your code**: Ensures that your code follows our code style guidelines.
* **Included a clear commit message**: Uses the Conventional Commits format to describe your changes.
* **Linked to relevant issues**: If your changes fix a bug or implement a feature, please link to the relevant issue in your pull request description.
* **Requested reviews**: Please request reviews from at least two maintainers to ensure that your changes are thoroughly reviewed.

By following these guidelines, you'll help us maintain a high-quality codebase and ensure that your contributions are properly reviewed and integrated. Thank you again for your contribution!