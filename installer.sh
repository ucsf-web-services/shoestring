#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${DIR}"


echo -e "\033[35m\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\033[0m"
echo -e "\033[35m  Shoestring Environment Configuration Checker and Installer\033[0m"
echo -e "\033[35m\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\033[0m"

echo -e "\033[34m Checking if Ruby is installed\033[0m"
ruby -v
if [[ $? != 0 ]] ; then
	echo -e "\033[34mInstalling Correct Ruby version and updating gem sets\033[0m"
	rvm install ${RUBY_VERSION}
		rvm default
		gem update --system
else
	echo -e "\033[34mYou have the correct version of Ruby. Sweet!\033[0m"

echo -e "\033[34m Checking if Bundler is installed\033[0m"

echo -e "\033[34m Checking if Node is installed\033[0m"

echo -e "\033[34m Checking if Npm is installed\033[0m"

