#!/bin/bash

NODE_VERSION=0.12.2
NPM_VERSION=2.14.4
RUBY_VERSION=2.2.3

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${DIR}"


echo -e "\033[35m\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\033[0m"
echo -e "\033[35m  Shoestring Environment Configuration Checker and Installer\033[0m"
echo -e "\033[35m\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\033[0m"


echo -e "\033[34m Checking if RVM is installed\033[0m"
rvm -v
if [[ $? != 0 ]] ; then
	echo "Installing RVM..."
	curl -sSL https://get.rvm.io | bash -s stabl
else 
	echo -e "\033[32mRVM Installed Already\033[0m"
fi

echo -e "\033[34mChecking if Ruby is installed\033[0m"
ruby -v
if [[ $? != 0 ]] ; then
	echo -e "\033[32mInstalling Correct Ruby version and updating gem sets...\033[0m"
	rvm install ${RUBY_VERSION}
		rvm default
		gem update --system
else
	echo -e "\033[32mYou have the correct version of Ruby. Sweet!\033[0m"
fi


echo -e "\033[34mChecking if Bundler is installed\033[0m"
bundler -v
if [[ $? != 0 ]] ; then
	echo -e "\033[32mInstalling Bundler...\033[0m"
	gem install bundler
else
	echo -e "\033[32mBundler Installed. NOICE!\033[0m"
fi

echo -e "\033[34mChecking if HomeBrew is installed\033[0m"
brew -v 
if [[ $? != 0 ]] ; then
	/usr/bin/ruby -e "ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)""
else
	echo -e "\033[32mHomebrew Installed. NOICE! Updating anyway...\033[0m"
	brew update
fi


echo -e "\033[34mChecking for Node version ${NODE_VERSION}\033[0m"
node --version | grep ${NODE_VERSION}
if [[ $? != 0 ]] ; then
	cd `brew --prefix`
	$(brew --version node | grep ${NODE_VERSION} | cut -c 16- -)
	brew install node

	git checkout HEAD -- `brew --repository` && git checkout -- `brew --repository`
else 
	echo -e "\033[32mCorrect version of Node installed\033[0m"
fi

cd /tmp
echo -e "\033[34mChecking for NPM version ${NPM_VERSION}\033[0m"
npm --version | grep ${NPM_VERSION}
if [[ $? != 0 ]] ; then
	echo -e "\033[32mDownloading npm\033[0m"
	git clone git://github.com/isaacs/npm.git && cd npm
  git checkout v${NPM_VERSION}
  make install
else
  echo -e "\033[32mCorrect version of NPM installed\033[0m"
fi

cd "${DIR}"

echo -e "\033[34mInstalling all Shoestring dependencies\033[0m"
echo -e "\033[34mHere weeee gooooo...\033[0m"

npm install
bundle install