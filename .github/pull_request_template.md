## 📝 Description

Provide a brief description of the changes in this PR.

## 🎯 Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Style/UI changes
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvements
- [ ] 🧪 Test additions or modifications
- [ ] 🔧 Build/CI changes

## 🎬 Cinema App Context

- [ ] Affects user authentication/authorization
- [ ] Affects movie browsing/search
- [ ] Affects ticket booking flow
- [ ] Affects payment processing
- [ ] Affects user profile/tickets management
- [ ] Affects responsive design/mobile experience
- [ ] Other: _______________

## 🧪 Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing completed
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness tested

### Test Coverage
- [ ] All new code is covered by tests
- [ ] Existing tests still pass
- [ ] Coverage percentage maintained or improved

## 📱 Screenshots/GIFs

If this PR includes UI changes, please provide before/after screenshots or GIFs:

### Before
<!-- Add screenshots/GIFs here -->

### After
<!-- Add screenshots/GIFs here -->

## 🔗 Related Issues

- Closes #(issue number)
- Related to #(issue number)

## 📋 Checklist

### Code Quality
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is properly commented, particularly complex areas
- [ ] No console.log statements left in code
- [ ] Error handling implemented where appropriate
- [ ] Loading states implemented for async operations

### React Best Practices
- [ ] Components follow single responsibility principle
- [ ] Proper prop types or TypeScript types defined
- [ ] Hooks used correctly (dependencies, cleanup)
- [ ] No memory leaks (event listeners, timers cleaned up)
- [ ] Accessibility attributes added where needed

### Cinema App Specific
- [ ] User authentication state handled properly
- [ ] API error handling implemented
- [ ] LocalStorage usage follows established patterns
- [ ] Routing follows React Router v5 patterns
- [ ] Form validation implemented where needed

### Documentation
- [ ] README.md updated if needed
- [ ] API documentation updated if needed
- [ ] Component documentation updated if needed

### Security
- [ ] No sensitive data exposed in client-side code
- [ ] Input validation implemented
- [ ] XSS prevention measures in place
- [ ] Authentication tokens handled securely

## 🚀 Deployment Notes

Any special deployment considerations or migration steps needed:

## 📝 Additional Notes

Add any other context about the pull request here.

---

## Reviewer Guidelines

### What to Look For:
1. **Functionality**: Does the code work as intended?
2. **Code Quality**: Is the code clean, readable, and maintainable?
3. **Testing**: Are there adequate tests for the changes?
4. **Performance**: Are there any performance implications?
5. **Security**: Are there any security concerns?
6. **UX**: Does this improve or maintain good user experience?
7. **Accessibility**: Is the app still accessible to all users?

### Testing Steps:
1. Pull the branch locally
2. Run `npm install` and `npm start`
3. Test the specific functionality changed
4. Test related functionality to ensure no regressions
5. Test on different screen sizes and browsers
6. Run the test suite: `npm test`
